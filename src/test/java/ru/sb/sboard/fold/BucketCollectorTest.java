package ru.sb.sboard.fold;

import java.util.NavigableMap;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;

class BucketCollectorTest {

    @org.junit.jupiter.api.Test
    void toBucketsWithInterval() {
        NavigableMap<Integer, Long> histogram = IntStream.of(1, 1, 2, 3, 3, 3, 4, 5)
                .boxed()
                .collect(BucketCollector.toBucketsWithInterval(
                        x -> x,
                        Collectors.counting()
                ));

        assertEquals((Long)3L, histogram.get(3));
        assertEquals((Long)1L, histogram.get(2));
    }
}