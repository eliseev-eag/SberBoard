package ru.sb.sboard.common.domain;

import lombok.Getter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@Getter
public class AbstractIdentity {
    @Id
    @GeneratedValue(generator = "")
    @GenericGenerator(name = "ids", strategy = "org.hibernate.id.IncrementGenerator")
    private Long id;
}
