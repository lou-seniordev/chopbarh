export function getReference() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 25; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
