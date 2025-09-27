import { getToken, setToken, removeToken } from "../../services/storage";

describe("Storage", () => {
  beforeEach(() => localStorage.clear());

  it("should save and read token", () => {
    setToken("abc123");
    expect(getToken()).toBe("abc123");
  });

  it("should remove token", () => {
    setToken("abc123");
    removeToken();
    expect(getToken()).toBeNull();
  });
});
