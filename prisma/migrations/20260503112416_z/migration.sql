-- DropForeignKey
ALTER TABLE `restaurant` DROP FOREIGN KEY `restaurant_region_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_region_id_fkey`;

-- DropIndex
DROP INDEX `restaurant_region_id_fkey` ON `restaurant`;

-- DropIndex
DROP INDEX `users_region_id_fkey` ON `users`;

-- AlterTable
ALTER TABLE `restaurant` ADD COLUMN `food_category_id` BIGINT NULL,
    MODIFY `region_id` BIGINT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `region_id` BIGINT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `region`(`region_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restaurant` ADD CONSTRAINT `restaurant_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `region`(`region_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restaurant` ADD CONSTRAINT `restaurant_food_category_id_fkey` FOREIGN KEY (`food_category_id`) REFERENCES `food_category`(`food_category_id`) ON DELETE SET NULL ON UPDATE CASCADE;
