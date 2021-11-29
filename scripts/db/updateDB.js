import mongoose from "mongoose";

const DailyReport = mongoose.model("DailyReport", {
  date: {
    year: Number,
    month: Number,
    day: Number,
  },
  value: Number,
});

export async function getData() {
  let res = await DailyReport.find({});
  let data = res;
  return await data;
}

export default function updateDB(order) {
  let Report = new DailyReport({
    date: {
      year: order.date.year,
      month: order.date.month,
      day: order.date.day,
    },
    value: order.value,
  });
  DailyReport.findOne({ date: Report.date }, (err, found) => {
    if (found == null) {
      Report.save();
      console.log(
        `Novo Daily Report, Dia ${order.date.day}/${order.date.month}/${order.date.year}, o valor atual é ${order.value}`
      );
    } else {
      DailyReport.updateOne(
        { date: Report.date },
        { value: found.value + Report.value },
        (err, res) => {
          err ? console.log(err) : "";
          console.log(
            `Daily Report Atualizado, Dia ${found.date.day}/${
              found.date.month
            }/${found.date.year}, o novo valor é ${found.value + Report.value}`
          );
        }
      );
    }
  });
}
