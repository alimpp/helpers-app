type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

const { error } = useToast();

export abstract class BaseApp<T extends { id: string | number }> {
  private readonly storageKey: string;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  private async request<T>(
    url: string,
    method: HttpMethod,
    body?: any,
    headers?: Record<string, string>
  ): mise<T> {
    const api = useCustomFetch();
    try {
      const response = await api(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return response as T;
    } catch (err) {
      error(`HTTP ${method} request to ${url} failed`);
      throw error;
    }
  }

  public async Get<T>(url: string): Promise<T> {
    return this.request<T>(url, "GET");
  }

  public async Post<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, "POST", body);
  }

  public async Patch<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, "PATCH", body);
  }

  public async Put<T>(url: string, body: any): Promise<T> {
    return this.request<T>(url, "PUT", body);
  }

  public async Delete<T>(url: string): Promise<T> {
    return this.request<T>(url, "DELETE");
  }

  public async Upload<T>(url: string, body: FormData): Promise<T> {
    const api = useCustomFetch();
    try {
      const response = await api(url, {
        method: "POST",
        body,
      });
      return response as T;
    } catch (err) {
      error(`File upload to ${url} failed:`);
      throw error;
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  public saveItem(item: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(item));
  }

  public clearStorage() {
    localStorage.clear();
  }

  protected getAllItems(): T[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  public saveAllItems(items: T[]): void {
    const result = JSON.stringify(items);
    localStorage.setItem(this.storageKey, result);
  }

  public create(item: Omit<T, "id">): T {
    const items = this.getAllItems();
    const newItem = {
      ...item,
      id: this.generateId(),
    } as T;
    items.push(newItem);
    this.saveAllItems(items);
    return newItem;
  }

  public read(id?: string | number): T | T[] | null {
    const items = this.getAllItems();
    return id ? items.find((item) => item.id == id) || null : items;
  }

  public update(id: string | number, updatedItem: Partial<T>): T | null {
    const items = this.getAllItems();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) return null;

    const updated = { ...items[index], ...updatedItem };
    items[index] = updated;
    this.saveAllItems(items);
    return updated;
  }

  public delete(id: string): boolean {
    const items = this.getAllItems();
    const filteredItems = items.filter((item) => item.id !== id);
    if (items.length === filteredItems.length) return false;
    this.saveAllItems(filteredItems);
    return true;
  }

  public readObject() {
    const result = localStorage.getItem(this.storageKey);
    return result ? JSON.parse(result) : null;
  }

  public updateObjectItem(item: any) {
    const items = this.getAllItems();
    items.push(item);
    this.saveItem(items);
  }
}
