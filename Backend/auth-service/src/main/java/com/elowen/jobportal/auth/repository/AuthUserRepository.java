package com.elowen.jobportal.auth.repository;

import com.elowen.jobportal.auth.entity.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthUserRepository extends JpaRepository<AuthUser, Long> {
    
    Optional<AuthUser> findByEmail(String email);
    
    Optional<AuthUser> findByPhone(String phone);
    
    boolean existsByEmail(String email);
    
    boolean existsByPhone(String phone);
}
