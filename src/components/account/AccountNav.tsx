import { NavLink } from "react-router-dom";

const links = [
  { to: "/profile", label: "Profile" },
  { to: "/orders", label: "Orders" },
  { to: "/wishlist", label: "Wishlist" },
];

const AccountNav = () => {
  return (
    <nav className="flex gap-1 mb-10 border-b border-border">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `px-4 py-3 text-body border-b-2 -mb-px transition-colors ${
              isActive
                ? "border-accent text-foreground font-medium"
                : "border-transparent text-muted hover:text-foreground"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export { AccountNav };
