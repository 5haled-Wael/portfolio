const AdminPageHeader = ({ title, children }) => {
  return (
    <div className="border-border flex items-center justify-between border-b pb-4">
      <h1 className="text-accent text-3xl font-bold">{title}</h1>

      {children}
    </div>
  );
};

export default AdminPageHeader;
