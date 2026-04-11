import { Command } from 'commander';
import { input, select, password, confirm } from '@inquirer/prompts';
import { createRepo, setSecret, enablePages, pushWorkflowFile, pushReadme, triggerWorkflow } from './github-api.js';
import { generateWorkflowYaml, getCronFromFrequency } from './workflows.js';
import { PROVIDERS, DEFAULT_MODELS } from './constants.js';
import { spinner } from '../../spinner.js';

export const setupCommand = new Command('setup')
  .description('Interactive setup wizard')
  .action(async () => {
    console.log('\n  github-dev-wrapped setup\n');

    const pat = await password({ message: 'GitHub Personal Access Token (PAT):' });
    const repoName = (await input({ message: 'Report repository name:', default: 'github-dev-wrapped' })).trim();
    const frequency = await select({
      message: 'Report frequency:',
      choices: [
        { value: 'weekly', name: 'Weekly' },
        { value: 'monthly', name: 'Monthly' },
      ],
    }) as 'weekly' | 'monthly';

    const provider = await select({
      message: 'LLM provider:',
      choices: PROVIDERS.map(p => ({ value: p })),
    }) as string;

    const defaultModel = DEFAULT_MODELS[provider] ?? '';
    const model = await input({ message: 'LLM model name:', default: defaultModel });
    const llmKey = await password({ message: `${provider} API key:` });

    const theme = await select({
      message: 'Theme:',
      choices: [
        { value: 'noir', name: 'Noir (dark, cinematic)' },
        { value: 'clean', name: 'Clean (light, minimal)' },
      ],
    }) as string;

    const language = await input({ message: 'Language code (en, ja, zh-CN...):', default: 'en' });
    const timezone = await input({ message: 'Timezone (IANA):', default: 'UTC' });

    const proceed = await confirm({ message: `Create "${repoName}" and configure everything?` });
    if (!proceed) { console.log('Aborted.'); return; }

    let s = spinner('Creating repository...');
    const { owner } = await createRepo(pat, repoName);
    s.stop(`Repository ${owner}/${repoName} created`);

    s = spinner('Storing secrets...');
    await setSecret(pat, owner, repoName, 'GDW_PAT', pat);
    await setSecret(pat, owner, repoName, 'GDW_LLM_KEY', llmKey);
    s.stop('Secrets stored');

    s = spinner('Enabling GitHub Pages...');
    const pagesUrl = await enablePages(pat, owner, repoName);
    s.stop(`GitHub Pages: ${pagesUrl}`);

    const workflow = generateWorkflowYaml({
      actionRef: `${owner}/github-dev-wrapped@main`,
      frequency,
      cron: getCronFromFrequency(frequency),
      theme,
      language,
      timezone,
      llmProvider: provider,
      llmModel: model,
    });

    s = spinner('Writing README...');
    await pushReadme(pat, owner, repoName, pagesUrl, frequency);
    s.stop('README written');

    s = spinner('Pushing workflow file...');
    await pushWorkflowFile(pat, owner, repoName, workflow);
    s.stop('Workflow committed to repo');

    s = spinner('Triggering first report...');
    await triggerWorkflow(pat, owner, repoName);
    s.stop('First report running');

    console.log('\n✓ Setup complete!');
    console.log(`  Your report will be live at: ${pagesUrl}`);
    console.log(`  First report is generating now — check Actions tab for progress.\n`);
  });
