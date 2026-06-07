/*
  Warnings:

  - The primary key for the `food_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `food_category` table. All the data in the column will be lost.
  - You are about to alter the column `gender` on the `member` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(0))`.
  - You are about to alter the column `status` on the `member` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(1))`.
  - The primary key for the `member_mission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `membermission_id` on the `member_mission` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `member_mission` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(3))`.
  - The primary key for the `point_history` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pointhistory_id` on the `point_history` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `point_history` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(4))`.
  - You are about to alter the column `category` on the `store` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(2))`.
  - The primary key for the `user_favor_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_favor_category` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `user_favor_category` table. All the data in the column will be lost.
  - You are about to drop the `practice_store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_store_review` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `food_category_id` to the `food_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_mission_id` to the `member_mission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `point_history_id` to the `point_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member_id` to the `user_favor_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_favor_category_id` to the `user_favor_category` table without a default value. This is not possible if the table is not empty.
  - Made the column `food_category_id` on table `user_favor_category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `user_favor_category` DROP FOREIGN KEY `user_favor_category_food_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_favor_category` DROP FOREIGN KEY `user_favor_category_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_store_review` DROP FOREIGN KEY `user_store_review_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_store_review` DROP FOREIGN KEY `user_store_review_user_id_fkey`;

-- DropIndex
DROP INDEX `user_id` ON `user_favor_category`;

-- AlterTable
ALTER TABLE `food_category` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `food_category_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`food_category_id`);

-- AlterTable
ALTER TABLE `member` ADD COLUMN `address` VARCHAR(255) NULL,
    ADD COLUMN `detail_address` VARCHAR(255) NULL,
    ADD COLUMN `password` VARCHAR(255) NOT NULL DEFAULT '',
    MODIFY `gender` ENUM('MALE', 'FEMALE', 'OTHER') NULL,
    MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'BANNED') NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE `member_mission` DROP PRIMARY KEY,
    DROP COLUMN `membermission_id`,
    ADD COLUMN `member_mission_id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `status` ENUM('IN_PROGRESS', 'COMPLETE') NOT NULL DEFAULT 'IN_PROGRESS',
    ADD PRIMARY KEY (`member_mission_id`);

-- AlterTable
ALTER TABLE `point_history` DROP PRIMARY KEY,
    DROP COLUMN `pointhistory_id`,
    ADD COLUMN `point_history_id` BIGINT NOT NULL AUTO_INCREMENT,
    MODIFY `type` ENUM('EARN', 'USE') NOT NULL,
    ADD PRIMARY KEY (`point_history_id`);

-- AlterTable
ALTER TABLE `store` MODIFY `category` ENUM('KOREAN', 'JAPANESE', 'CHINESE', 'WESTERN', 'CAFE', 'FAST_FOOD', 'OTHER') NOT NULL;

-- AlterTable
ALTER TABLE `user_favor_category` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `member_id` BIGINT NOT NULL,
    ADD COLUMN `user_favor_category_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `food_category_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`user_favor_category_id`);

-- DropTable
DROP TABLE `practice_store`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `user_store_review`;

-- CreateIndex
CREATE INDEX `member_id` ON `user_favor_category`(`member_id`);

-- AddForeignKey
ALTER TABLE `user_favor_category` ADD CONSTRAINT `user_favor_category_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favor_category` ADD CONSTRAINT `user_favor_category_food_category_id_fkey` FOREIGN KEY (`food_category_id`) REFERENCES `food_category`(`food_category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
