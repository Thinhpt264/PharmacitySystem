package com.example.OnlinePharmacySystem.Ultis;

import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

public class RandomHelper {
    public static String random() {
        return UUID.randomUUID().toString().replace("-", "");

    }
    public static String random6Digits() {
        int number = ThreadLocalRandom.current().nextInt(100000, 1000000); // từ 100000 đến 999999
        return String.valueOf(number);
    }

    public static void main(String[] args) {
        System.out.println("6 numbers: " + random6Digits());
    }

}
