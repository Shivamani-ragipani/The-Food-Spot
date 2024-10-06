export default function Error({ title, msg }) {
  return (
    <div className="Error">
        <h2>{title}</h2>
        <p>{msg}</p>
    </div>
  );
}
