import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  // ELEMENTS
  
  private readonly NavBarOpened = ".bm-menu";
  private readonly NavBarOpenBtn = "#react-burger-menu-btn";
  private readonly SauceLabsBackpackAddToCartBtn = "#add-to-cart";
  private readonly CartBtn = ".shopping_cart_container > a";
  private readonly navigationOpenBtn = "#react-burger-menu-btn";
  private readonly AllItemBtn = "#inventory_sidebar_link";
  private readonly ShoppingCartBadge =".shopping_cart_badge";
  private readonly addToCartBtn = ".btn.btn_primary.btn_small.btn_inventory";
  private readonly productPrice = ".inventory_details_price";
  private readonly SauceLabsBackpackTitle = ".inventory_details_name.large_size";
  private readonly SauceLabsBackpackText = "[data-test='inventory-item-desc']";
  private readonly SaubeLAbsBackpackIMG = '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg'


  constructor(page: Page) {
    super(page);
  }
  
  // METHODS

  async clickNavBarOpenBtn(): Promise<void> {
    await this.click(this.NavBarOpenBtn); 
  }

  async isNavBarVisible(): Promise<boolean> {
    return (await this.page.locator(this.NavBarOpened).count()) > 0; 
  }

  async addBackPackToCart(): Promise<void> {
    await this.page.locator(this.SauceLabsBackpackAddToCartBtn).click(); 
  }

  async clickOnCartBtn(): Promise<void> {
    await this.page.locator(this.CartBtn).click(); 
  }

  async clickOnNavBarBtn(): Promise<void> {
    await this.page.locator(this.navigationOpenBtn).click();
    await this.page.locator(this.AllItemBtn).click();
  }

  async clickOnAllItemsBtn(): Promise<void> {
    await this.page.locator(this.navigationOpenBtn).click();
    await this.page.locator(this.AllItemBtn).click();
  }

  async isCartFull(): Promise<boolean> {
    return (await this.page.locator(this.ShoppingCartBadge).isVisible()) === true;
  }

  async isCartEmpty(): Promise<boolean> {
    return (await this.page.locator(this.ShoppingCartBadge).isVisible()) === false;
  }

  async clickOnAddToCartBtn(): Promise<void> {
    await this.page.locator(this.addToCartBtn).click(); 
  }


  async getSauceLabsBackpackPrice(): Promise<string> {
    return await this.getText(this.productPrice);
  }

  async getSauceLabsBackpackTitle(): Promise<string> {
    return await this.getText(this.SauceLabsBackpackTitle);
  }

  async getSauceLabsBackpackText(): Promise<string> {
    return await this.getText(this.SauceLabsBackpackText);
  }



}
