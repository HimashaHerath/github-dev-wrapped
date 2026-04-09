export function spinner(message: string): { stop: (done?: string) => void } {
  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(`\r${frames[i++ % frames.length]} ${message}`);
  }, 80);

  return {
    stop(done?: string) {
      clearInterval(interval);
      if (done) process.stdout.write(`\r✓ ${done}\n`);
      else process.stdout.write('\r');
    },
  };
}
