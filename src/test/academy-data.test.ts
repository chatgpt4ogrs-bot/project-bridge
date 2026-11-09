import { describe, expect, it } from "vitest";
import { courses, filterCourses } from "@/lib/academy-data";

describe("catalog filters", () => {
  it("shows 3 courses in progress", () => {
    expect(filterCourses(courses, { status: "andamento", category: "all", query: "" })).toHaveLength(3);
  });
  it("finds courses by instructor name", () => {
    const r = filterCourses(courses, { status: "all", category: "all", query: "mariana" });
    expect(r.map((c) => c.id)).toEqual(["acesso"]);
  });
});
