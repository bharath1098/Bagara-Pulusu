import { NextRequest, NextResponse } from "next/server";
import {
  daySalesToCsv,
  getDaySalesReport,
  todayDayKey,
} from "@/lib/day-sales";
import { parseDayParam } from "@/lib/analytics";
import { readStaffRequest } from "@/lib/staff-gate";

export const dynamic = "force-dynamic";

function allowSalesRole(role: string) {
  return role === "owner" || role === "reception";
}

export async function GET(req: NextRequest) {
  const session = readStaffRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Please sign in again" }, { status: 401 });
  }
  if (!allowSalesRole(session.role)) {
    return NextResponse.json(
      { error: "You don't have permission for that" },
      { status: 403 },
    );
  }

  const rawDate = req.nextUrl.searchParams.get("date");
  const today = todayDayKey();
  let date = rawDate && parseDayParam(rawDate) ? rawDate : today;
  if (date > today) date = today;

  const report = await getDaySalesReport(date);
  const format = (req.nextUrl.searchParams.get("format") || "json").toLowerCase();

  if (format === "csv") {
    const body = daySalesToCsv(report);
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="bagara-pulusu-sales-${report.date}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }

  return NextResponse.json(report);
}
