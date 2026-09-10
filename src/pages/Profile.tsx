import { mockUser, mockAddresses } from "../data/mockUser";
import { AccountNav } from "../components/account/AccountNav";
import { ClayButton } from "../components/ui/ClayButton";

const Profile = () => {
  return (
    <div className="px-6 md:px-10 py-16 max-w-3xl mx-auto">
      <h1 className="text-headline mb-2">Your Account</h1>
      <p className="text-body text-muted mb-6">
        Manage your profile, addresses, and preferences.
      </p>

      <AccountNav />

      <div className="space-y-10">
        {/* Profile info */}
        <section>
          <h2 className="text-title mb-4">Profile</h2>
          <div className="bg-surface border border-border rounded-clay p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-body text-muted">Name</span>
              <span className="text-body font-medium">{mockUser.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body text-muted">Email</span>
              <span className="text-body font-medium">{mockUser.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body text-muted">Member since</span>
              <span className="text-body font-medium">
                {new Date(mockUser.memberSince).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>
          </div>
        </section>

        {/* Addresses */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-title">Addresses</h2>
            <ClayButton variant="secondary">Add Address</ClayButton>
          </div>

          <div className="space-y-3">
            {mockAddresses.map((address) => (
              <div
                key={address.id}
                className="bg-surface border border-border rounded-clay p-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-body font-medium">{address.label}</p>
                  {address.isDefault && (
                    <span className="text-caption text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-body text-muted">{address.fullName}</p>
                <p className="text-body text-muted">
                  {address.street}, {address.city} {address.postalCode}
                </p>
                <p className="text-body text-muted">{address.country}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Settings placeholder */}
        <section>
          <h2 className="text-title mb-4">Settings</h2>
          <div className="bg-surface border border-border rounded-clay p-6">
            <p className="text-body text-muted">
              Notification and password settings will live here once
              authentication is in place.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export { Profile };
