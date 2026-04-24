export default function Avatar({ name, idx = 1, size = '' }) {
  const initials = name
    ? name.split(' ').filter(Boolean).slice(0, 2).map((s) => s[0]).join('').toUpperCase()
    : '??';
  return (
    <div className={`avatar ${size} avatar-initial-${idx}`} title={name}>
      {initials}
    </div>
  );
}
