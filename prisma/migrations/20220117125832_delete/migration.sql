-- CreateTable
CREATE TABLE `Follow` (
    `follow_id` VARCHAR(191) NOT NULL,
    `follow_by` VARCHAR(191) NOT NULL,
    `follow_by_u` VARCHAR(191) NOT NULL,
    `follow_to` VARCHAR(191) NOT NULL,
    `follow_to_u` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`follow_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorite_Meal` (
    `fav_meal_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `meal_id` VARCHAR(191) NOT NULL,
    `meal_ref` VARCHAR(191) NOT NULL,

    INDEX `Favorite_Meal_meal_id_idx`(`meal_id`),
    PRIMARY KEY (`fav_meal_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
