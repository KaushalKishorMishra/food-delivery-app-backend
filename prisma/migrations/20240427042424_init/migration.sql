/*
  Warnings:

  - Added the required column `delivery_option` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_type` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "auth"."Status" AS ENUM ('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'ON_THE_WAY', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."OrderType" AS ENUM ('TAKE_AWAY', 'DINE_IN', 'DELIVERY');

-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'DELIVERY';

-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_item_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Image" DROP CONSTRAINT "Image_recipe_id_fkey";

-- AlterTable
ALTER TABLE "auth"."Order" ADD COLUMN     "delivery_id" TEXT,
ADD COLUMN     "delivery_option" BOOLEAN NOT NULL,
ADD COLUMN     "order_status" "auth"."Status" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "order_type" "public"."OrderType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Image" ALTER COLUMN "image" DROP NOT NULL;

-- CreateTable
CREATE TABLE "auth"."Delivery" (
    "id" TEXT NOT NULL,
    "delivery_id" TEXT NOT NULL,
    "delivery_guy_name" TEXT NOT NULL,
    "delivery_guy_phone" TEXT NOT NULL,
    "delivery_status" "auth"."Status" NOT NULL DEFAULT 'PENDING',
    "delivery_time" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_delivery_id_key" ON "auth"."Delivery"("delivery_id");

-- AddForeignKey
ALTER TABLE "auth"."Order" ADD CONSTRAINT "Order_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "auth"."Delivery"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "public"."Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "public"."Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "public"."Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "public"."Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
