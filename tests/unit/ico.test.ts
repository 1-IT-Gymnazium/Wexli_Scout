import { describe, expect, it } from "vitest";
import { isValidIco } from "@/lib/ico";

describe("isValidIco", () => {
  it("přijme platné IČO", () => {
    expect(isValidIco("27082440")).toBe(true);
  });

  it("odmítne IČO se špatnou kontrolní číslicí", () => {
    expect(isValidIco("27082441")).toBe(false);
  });

  it("odmítne nesmysl", () => {
    expect(isValidIco("abc")).toBe(false);
    expect(isValidIco("123456789")).toBe(false);
  });
});
