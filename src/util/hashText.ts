import forge from 'node-forge';

export default function(text: string) {
  const md = forge.md.sha256.create();

  return md.update(text).digest().toHex();
}