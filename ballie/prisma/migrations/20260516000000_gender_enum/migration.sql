-- 1. 임시 ENUM 컬럼 추가
ALTER TABLE `users` ADD COLUMN `gender_new` ENUM('MALE', 'FEMALE') NULL;

-- 2. 기존 INT 데이터를 ENUM 값으로 변환 (0 -> MALE, 1 -> FEMALE)
UPDATE `users` SET `gender_new` = CASE
  WHEN `gender` = 0 THEN 'MALE'
  WHEN `gender` = 1 THEN 'FEMALE'
  ELSE NULL
END;

-- 3. 기존 INT 컬럼 삭제
ALTER TABLE `users` DROP COLUMN `gender`;

-- 4. 임시 컬럼을 gender로 이름 변경
ALTER TABLE `users` RENAME COLUMN `gender_new` TO `gender`;
