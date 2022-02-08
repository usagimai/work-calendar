export const DecorationTitle = ({ title, fontSize }) => {
  return (
    <div className="decoration-title">
      <div className={`font-decoration-${fontSize}`}></div>
      <div className={`${fontSize}-text`}>{title}</div>
    </div>
  );
};
