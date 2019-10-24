package ru.sb.sboard.fold;

import java.util.Comparator;
import java.util.NavigableMap;
import java.util.TreeMap;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public class BucketCollector {

    public static <T, D, A, M extends NavigableMap<T, D>> Collector<T, ?, M> toBucketsWithInterval(
            Interval<T> interval,
            Comparator<T> comparator,
            Collector<? super T, A, D> downstream
    ) {
        return Collectors.groupingBy(
                interval::floor,
                () -> (M) new TreeMap<T, D>(comparator),
                downstream
        );
    }

    public static <T extends Comparable<? super T>, D, A, M extends NavigableMap<T, D>> Collector<T, ?, M> toBucketsWithInterval(
            Interval<T> interval,
            Collector<? super T, A, D> downstream
    ) {
        return toBucketsWithInterval(
                interval,
                Comparator.naturalOrder(),
                downstream
        );
    }

}
