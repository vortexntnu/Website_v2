/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
    // This targets the system collection for admins/superusers
    const superusers = app.findCollectionByNameOrId("_superusers");
    
    try {
        // Check if the admin already exists to avoid "unique constraint" errors
        // This makes the script safe to run multiple times
        app.findAdminByEmail("web@vortexntnu.no");
    } catch (e) {
        // If not found, create the shared team account
        const record = new Record(superusers);
        record.set("email", "web@vortexntnu.no");
        record.set("password", "vortex_pass_2026");
        app.save(record);
    }
}, (app) => {
    // Optional: Logic to remove the admin if you ever revert this migration
    try {
        const admin = app.findAdminByEmail("web@vortexntnu.no");
        app.delete(admin);
    } catch (e) {}
})