package com.example.OnlinePharmacySystem.Ultis;

import com.example.OnlinePharmacySystem.entities.Account;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private final Account account;

    public CustomUserDetails(Account account) {
        this.account = account;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(() -> "ROLE_" + getRoleName(account.getRole()));
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }

    @Override
    public String getUsername() {
        return account.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return account.getStatus();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return account.getStatus();
    }

    public Account getAccount() {
        return account;
    }

    public String getRoleName() {
        return getRoleName(account.getRole());
    }

    private String getRoleName(int roleValue) {
        return switch (roleValue) {
            case 0 -> "ADMIN";
            case 1 -> "USER";
            case 2 -> "EMPLOYEE";
            default -> "USER";
        };
    }
}
