package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.orm.entities.GenreEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface GenreRepository extends PagingAndSortingRepository<GenreEntity, Long> { }
