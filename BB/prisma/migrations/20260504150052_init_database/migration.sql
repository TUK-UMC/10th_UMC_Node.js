-- CreateTable
CREATE TABLE `User` (
    `user_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,
    `gender` VARCHAR(10) NULL,
    `birth` DATE NULL,
    `address` VARCHAR(255) NULL,
    `email` VARCHAR(100) NULL,
    `phone` VARCHAR(20) NULL,
    `is_phone_admitted` BOOLEAN NULL,
    `provider` VARCHAR(10) NULL,
    `point` INTEGER NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `deleted_at` DATETIME(6) NULL,
    `status` VARCHAR(10) NULL,
    `inactive_date` DATETIME(3) NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodCategory` (
    `category_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPreference` (
    `user_preference_id` BIGINT NOT NULL AUTO_INCREMENT,
    `category_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,

    PRIMARY KEY (`user_preference_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restaurant` (
    `restaurant_id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,
    `address` VARCHAR(255) NULL,
    `open` TIME(0) NULL,
    `close` TIME(0) NULL,
    `boss_num` VARCHAR(100) NULL,

    PRIMARY KEY (`restaurant_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestaurantImage` (
    `restaurant_image_id` BIGINT NOT NULL AUTO_INCREMENT,
    `restaurant_id` BIGINT NOT NULL,
    `image_url` VARCHAR(255) NULL,

    PRIMARY KEY (`restaurant_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mission` (
    `mission_id` BIGINT NOT NULL AUTO_INCREMENT,
    `restaurant_id` BIGINT NULL,
    `deadline` DATETIME(3) NULL,
    `price` INTEGER NULL,
    `point` INTEGER NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,

    PRIMARY KEY (`mission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Complete` (
    `complete_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `mission_id` BIGINT NOT NULL,
    `restaurant_id` BIGINT NOT NULL,
    `is_completed` BOOLEAN NULL,
    `completed_at` DATETIME(3) NULL,

    PRIMARY KEY (`complete_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `review_id` BIGINT NOT NULL AUTO_INCREMENT,
    `restaurant_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `content` TEXT NULL,
    `star` DECIMAL(2, 1) NULL,
    `answer` TEXT NULL,
    `created_at` DATETIME(6) NULL,

    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewImage` (
    `review_image_id` BIGINT NOT NULL AUTO_INCREMENT,
    `review_id` BIGINT NOT NULL,
    `restaurant_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `image_url` VARCHAR(255) NULL,

    PRIMARY KEY (`review_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alarm` (
    `alarm_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `alarm_type` ENUM('MISSION', 'REVIEW') NULL,
    `title` VARCHAR(50) NULL,
    `content` TEXT NULL,
    `is_confirmed` BOOLEAN NULL,
    `created_at` DATETIME(6) NULL,
    `updated_at` DATETIME(6) NULL,
    `is_read` BOOLEAN NULL,

    PRIMARY KEY (`alarm_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAlarmSetting` (
    `user_alarm_setting_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `alarm_type` ENUM('MISSION', 'REVIEW') NULL,
    `is_enabled` BOOLEAN NULL,

    PRIMARY KEY (`user_alarm_setting_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inquiry` (
    `inquiry_id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `title` VARCHAR(100) NULL,
    `content` VARCHAR(200) NULL,
    `created_at` DATETIME(6) NULL,
    `is_answered` BOOLEAN NULL,

    PRIMARY KEY (`inquiry_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InquiryImage` (
    `inquiry_image_id` BIGINT NOT NULL AUTO_INCREMENT,
    `inquiry_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `image_url` VARCHAR(255) NULL,

    PRIMARY KEY (`inquiry_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Answer` (
    `answer_id` BIGINT NOT NULL AUTO_INCREMENT,
    `inquiry_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `content` TEXT NULL,
    `created_at` DATETIME(6) NULL,

    PRIMARY KEY (`answer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserPreference` ADD CONSTRAINT `UserPreference_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `FoodCategory`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPreference` ADD CONSTRAINT `UserPreference_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestaurantImage` ADD CONSTRAINT `RestaurantImage_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurant`(`restaurant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurant`(`restaurant_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complete` ADD CONSTRAINT `Complete_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complete` ADD CONSTRAINT `Complete_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `Mission`(`mission_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Complete` ADD CONSTRAINT `Complete_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurant`(`restaurant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurant`(`restaurant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewImage` ADD CONSTRAINT `ReviewImage_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `Review`(`review_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewImage` ADD CONSTRAINT `ReviewImage_restaurant_id_fkey` FOREIGN KEY (`restaurant_id`) REFERENCES `Restaurant`(`restaurant_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewImage` ADD CONSTRAINT `ReviewImage_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alarm` ADD CONSTRAINT `Alarm_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAlarmSetting` ADD CONSTRAINT `UserAlarmSetting_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inquiry` ADD CONSTRAINT `Inquiry_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InquiryImage` ADD CONSTRAINT `InquiryImage_inquiry_id_fkey` FOREIGN KEY (`inquiry_id`) REFERENCES `Inquiry`(`inquiry_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InquiryImage` ADD CONSTRAINT `InquiryImage_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_inquiry_id_fkey` FOREIGN KEY (`inquiry_id`) REFERENCES `Inquiry`(`inquiry_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Answer` ADD CONSTRAINT `Answer_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
