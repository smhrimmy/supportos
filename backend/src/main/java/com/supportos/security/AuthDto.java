package com.supportos.security;

public class AuthDto {

    public static class LoginRequest {
        private String email;
        private String password;

        public LoginRequest() {}
        public LoginRequest(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String tenantSlug = "acme";
        private String email;
        private String password;
        private String fullName;
        private String department = "Support";
        private Role role = Role.AGENT;

        public RegisterRequest() {}

        public String getTenantSlug() { return tenantSlug; }
        public void setTenantSlug(String tenantSlug) { this.tenantSlug = tenantSlug; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
        public Role getRole() { return role; }
        public void setRole(Role role) { this.role = role; }
    }

    public static class AuthResponse {
        private String token;
        private Long userId;
        private String email;
        private String fullName;
        private String role;
        private String tenantSlug;
        private String department;

        public AuthResponse() {}

        public AuthResponse(String token, Long userId, String email, String fullName, String role, String tenantSlug, String department) {
            this.token = token;
            this.userId = userId;
            this.email = email;
            this.fullName = fullName;
            this.role = role;
            this.tenantSlug = tenantSlug;
            this.department = department;
        }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getTenantSlug() { return tenantSlug; }
        public void setTenantSlug(String tenantSlug) { this.tenantSlug = tenantSlug; }
        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
    }
}
