-- CreateTable
CREATE TABLE "EventCategorie" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EventCategorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "EventType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToEventType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToEventCategorie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventType_AB_unique" ON "_EventToEventType"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventType_B_index" ON "_EventToEventType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventCategorie_AB_unique" ON "_EventToEventCategorie"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventCategorie_B_index" ON "_EventToEventCategorie"("B");

-- AddForeignKey
ALTER TABLE "_EventToEventType" ADD CONSTRAINT "_EventToEventType_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventType" ADD CONSTRAINT "_EventToEventType_B_fkey" FOREIGN KEY ("B") REFERENCES "EventType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventCategorie" ADD CONSTRAINT "_EventToEventCategorie_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventCategorie" ADD CONSTRAINT "_EventToEventCategorie_B_fkey" FOREIGN KEY ("B") REFERENCES "EventCategorie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
