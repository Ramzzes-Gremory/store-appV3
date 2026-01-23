import { Nomenclature } from "../models/Nomenclature"


// server/api/fix-types.get.ts
export default defineEventHandler(async (event) => {
    const collection = Nomenclature.collection;

    // Шукаємо документи, де created має тип "string" (код типу 2 в MongoDB)
    const itemsWithStrings = await collection.find({
        "timeBlock.created": { $type: 2 }
    }).toArray();

    let fixed = 0;
    for (const item of itemsWithStrings) {
        const dateValue = new Date(item.timeBlock.created);

        if (!isNaN(dateValue.getTime())) {
            await collection.updateOne(
                { _id: item._id },
                { $set: { "timeBlock.created": dateValue } }
            );
            fixed++;
        }
    }

    return { message: "Типи виправлено", fixedCount: fixed };
});