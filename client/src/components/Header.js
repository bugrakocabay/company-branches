import Button from './Button';

export const Header = ({ onAdd, showAdd }) => {
  return (
    <header className="header">
      <h1>Company Branches</h1>
      <Button
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'close' : 'Add'}
        onClick={onAdd}
      />
    </header>
  );
};
