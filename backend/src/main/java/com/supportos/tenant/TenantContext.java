package com.supportos.tenant;

public class TenantContext {
    private static final ThreadLocal<String> CURRENT_TENANT = new ThreadLocal<>();
    private static final String DEFAULT_TENANT = "acme";

    public static void setTenant(String tenantSlug) {
        CURRENT_TENANT.set(tenantSlug);
    }

    public static String getTenant() {
        String tenant = CURRENT_TENANT.get();
        return (tenant != null && !tenant.trim().isEmpty()) ? tenant : DEFAULT_TENANT;
    }

    public static void clear() {
        CURRENT_TENANT.remove();
    }
}
