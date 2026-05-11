/*
  Warnings:

  - You are about to drop the column `name` on the `food_category` table. All the data in the column will be lost.
  - Added the required column `food_category_name` to the `food_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `food_category` DROP COLUMN `name`,
    ADD COLUMN `food_category_name` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_deleted` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `mission_point` INTEGER NULL DEFAULT 0,
    ADD COLUMN `region_id` BIGINT NOT NULL;

-- CreateTable
CREATE TABLE `region` (
    `region_id` BIGINT NOT NULL AUTO_INCREMENT,
    `region_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`region_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant` (
    `restaurant_id` BIGINT NOT NULL AUTO_INCREMENT,
    `restaurant_name` VARCHAR(20) NOT NULL,
    `region_id` BIGINT NOT NULL,
    `is_deleted` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`restaurant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_image` (
    `restaurant_image_id` BIGINT NOT NULL AUTO_INCREMENT,
    `restaurant_id` BIGINT NOT NULL,
    `restaurant_image_url` TEXT NOT NULL,

    PRIMARY KEY (`restaurant_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `review_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `restaurant_id` BIGINT NOT NULL,
    `review_title` VARCHAR(20) NOT NULL,
    `review_content` TEXT NOT NULL,
    `score` DOUBLE NOT NULL,
    `is_deleted` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review_image` (
    `review_image_id` BIGINT NOT NULL AUTO_INCREMENT,
    `review_id` BIGINT NOT NULL,
    `review_image_url` TEXT NOT NULL,

    PRIMARY KEY (`review_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `mission_id` BIGINT NOT NULL AUTO_INCREMENT,
    `mission_title` VARCHAR(30) NOT NULL,
    `mission_content` TEXT NOT NULL,
    `mission_point` INTEGER NOT NULL,
    `mission_type` ENUM('REGION', 'RESTAURANT') NOT NULL,
    `is_deleted` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission_region` (
    `mission_region_id` BIGINT NOT NULL AUTO_INCREMENT,
    `mission_id` BIGINT NOT NULL,
    `region_id` BIGINT NOT NULL,

    UNIQUE INDEX `mission_region_mission_id_key`(`mission_id`),
    PRIMARY KEY (`mission_region_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission_restaurant` (
    `mission_restaurant_id` BIGINT NOT NULL AUTO_INCREMENT,
    `mission_id` BIGINT NOT NULL,
    `restaurant_id` BIGINT NOT NULL,

    UNIQUE INDEX `mission_restaurant_mission_id_key`(`mission_id`),
    PRIMARY KEY (`mission_restaurant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_mission` (
    `user_mission_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `mission_id` BIGINT NOT NULL,
    `user_mission_status` ENUM('ACTIVE', 'PENDING', 'COMPLETED', 'ENDED') NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`user_mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alarm` (
    `alarm_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `alarm_type` ENUM('RESTAURANT', 'NOTICE') NOT NULL,
    `is_deleted` BOOLEAN NULL DEFAULT false,
    `alarm_title` VARCHAR(30) NOT NULL,
    `alarm_content` TEXT NOT NULL,

    PRIMARY KEY (`alarm_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alarm_notice` (
    `alarm_notice_id` BIGINT NOT NULL AUTO_INCREMENT,
    `alarm_id` BIGINT NOT NULL,

    UNIQUE INDEX `alarm_notice_alarm_id_key`(`alarm_id`),
    PRIMARY KEY (`alarm_notice_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alarm_restaurant` (
    `alarm_restaurant_id` BIGINT NOT NULL AUTO_INCREMENT,
    `alarm_id` BIGINT NOT NULL,
    `restaurant_id` BIGINT NOT NULL,

    UNIQUE INDEX `alarm_restaurant_alarm_id_key`(`alarm_id`),
    PRIMARY KEY (`alarm_restaurant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `region`(`region_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restaurant` ADD CONSTRAINT `restaurant_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `region`(`region_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restaurant_image` ADD CONSTRAINT `restaurant_image_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`restaurant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`restaurant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review_image` ADD CONSTRAINT `review_image_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `review`(`review_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission_region` ADD CONSTRAINT `mission_region_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`mission_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission_region` ADD CONSTRAINT `mission_region_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `region`(`region_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission_restaurant` ADD CONSTRAINT `mission_restaurant_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`mission_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission_restaurant` ADD CONSTRAINT `mission_restaurant_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`restaurant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_mission` ADD CONSTRAINT `user_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`mission_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alarm` ADD CONSTRAINT `alarm_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alarm_notice` ADD CONSTRAINT `alarm_notice_alarm_id_fkey` FOREIGN KEY (`alarm_id`) REFERENCES `alarm`(`alarm_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alarm_restaurant` ADD CONSTRAINT `alarm_restaurant_alarm_id_fkey` FOREIGN KEY (`alarm_id`) REFERENCES `alarm`(`alarm_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alarm_restaurant` ADD CONSTRAINT `alarm_restaurant_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant`(`restaurant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
