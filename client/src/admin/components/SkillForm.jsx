import { useState } from "react";

const SkillForm = ({ initialValues, submit }) => {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [type, setType] = useState(initialValues?.type ?? "");
  const [icon, setIcon] = useState(initialValues?.icon ?? "");
  const [order, setOrder] = useState(initialValues?.order ?? 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    submit({
      name,
      type,
      icon,
      order,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <label htmlFor="name" className="text-secondary text-sm font-medium">
            Name
          </label>
          <input
            className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="type" className="text-secondary text-sm font-medium">
            Type
          </label>
          <input
            className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
            type="text"
            id="type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />

          <label htmlFor="order" className="text-secondary text-sm font-medium">
            Order
          </label>
          <input
            className="border-border bg-surface text-primary focus:border-accent rounded-md border px-2 py-1 outline-none"
            type="number"
            id="order"
            name="order"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            required
          />

          <label htmlFor="icon" className="text-secondary text-sm font-medium">
            Icon URL
          </label>
          <div className="flex items-center gap-2">
            <input
              className="border-border bg-surface text-primary focus:border-accent flex-5 rounded-md border px-2 py-1 outline-none"
              type="text"
              id="icon"
              name="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              required
            />

            <a
              href="https://devicon.dev/"
              target="_blank"
              className="text-secondary hover:text-accent truncate text-sm"
            >
              Find Icons Here
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-accent text-primary hover:bg-accent/80 rounded-lg px-4 py-2 font-semibold transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SkillForm;
