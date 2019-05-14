package com.noudh.ratethemovie.orm.repository;

import com.noudh.ratethemovie.models.Genre;
import com.noudh.ratethemovie.orm.entities.GenreEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Collection;
import java.util.List;

public interface GenreRepository extends PagingAndSortingRepository<GenreEntity, Long> {

    GenreEntity findByGenre(Genre genre);

    List<GenreEntity> findByGenreIn(Collection<Genre> genre);

}
