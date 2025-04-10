-- Clear existing data
TRUNCATE TABLE "projects_to_images" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "projects" RESTART IDENTITY CASCADE;
TRUNCATE TABLE "images" RESTART IDENTITY CASCADE;

-- Insert sample data into images
INSERT INTO "images" ("url", "alt", "width", "height", "created_at", "updated_at")
VALUES
('https://live.staticflickr.com/65535/54252141226_8e8fafa488.jpg', 'An abstract painting', 500, 500, now(), now()),
('https://live.staticflickr.com/65535/54250448119_272f684c00_z.jpg', 'A serene landscape', 640, 480, now(), now()),
('https://live.staticflickr.com/65535/54249597041_12eafe5172_c.jpg', 'A futuristic cityscape', 800, 554, now(), now());

-- Insert sample data into projects
INSERT INTO "projects" ("title", "slug", "description", "category", "cover_image_id", "is_featured", "created_at", "updated_at")
VALUES
('Abstract Visions', 'abstract-visions', 'Exploring abstract concepts through art.', 'background-painting', 1, true, now(), now()),
('Digital Serenity', 'digital-serenity', 'Capturing the serenity of landscapes through digital media.', 'visual-development', 2, false, now(), now()),
('Futuristic Dreams', 'futuristic-dreams', 'Envisioning the future through art.', 'playground', 3, true, now(), now());

-- Insert sample data into projects_to_images
INSERT INTO "projects_to_images" ("project_id", "image_id")
VALUES
(1, 1),
(2, 2),
(3, 3),
(3, 1);
