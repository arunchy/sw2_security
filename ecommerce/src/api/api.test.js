import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
    sendOTPApi,
    signupApi,
    loginApi,
    getLatestProductApi,
    getBrandsApi,
    getProductByBrand,
    getMenProductsApi,
    getFemaleProductApi,
    createProductApi,
    searchProductsApi,
    addToCartApi,
    getCartDataApi,
    createBillApi,
    userDetailsApi,
} from "./api"; 

// Set up a mock adapter
const mock = new MockAdapter(axios);

describe("API Functions", () => {
    afterEach(() => {
        mock.reset();
    });

    it("should send OTP successfully", async () => {
        const data = { email: "arunchy600@gmail.com",password:"hello@123","user_type":"customer" };
        mock.onPost("/account/otp/").reply(200, { success: true });

        const response = await sendOTPApi(data);
        expect(response.data.success).toBe(true);
    });

    it("should sign up successfully", async () => {
        const data = { email:"some_new_email@gmail.com", password: "password",first_name:"hello",last_name:"world",phone_number:"9845123071",date_of_birth:"2058-01-14",city:"kathmandu",street_address:"jadibuti",gender:"male"};
        mock.onPost("/account/signup/").reply(201, { id: 1 });

        const response = await signupApi(data);
        expect(response.status).toBe(201);
        expect(response.data.id).toBe(1);
    });

    it("should log in successfully", async () => {
        const data = { email: "some_email@gmail.com", password: "password",user_type:"customer" };
        mock.onPost("/account/login/").reply(200, { token: "abc123" });

        const response = await loginApi(data);
        expect(response.status).toBe(200);
        expect(response.data.token).toBe("abc123");
    });

    it("should get the latest product", async () => {
        const productData = { id: 1, name: "Latest Product" };
        mock.onGet("/product/latest-product/").reply(200, productData);

        const response = await getLatestProductApi();
        expect(response.data).toEqual(productData);
    });

    it("should get brands list", async () => {
        const brands = ["Brand1", "Brand2"];
        mock.onGet("/product/get-product-brands/").reply(200, brands);

        const response = await getBrandsApi();
        expect(response.data).toEqual(brands);
    });

    it("should get products by brand", async () => {
        const brand = "Brand1";
        const products = [{ id: 1, name: "Product1" }];
        mock.onGet(`/product/get-products-by-brand/?brand=${brand}`).reply(200, products);

        const response = await getProductByBrand(brand);
        expect(response.data).toEqual(products);
    });

    it("should get men products", async () => {
        const products = [{ id: 1, name: "Men Product" }];
        mock.onGet("/product/get-male-products/").reply(200, products);

        const response = await getMenProductsApi();
        expect(response.data).toEqual(products);
    });

    it("should get female products", async () => {
        const products = [{ id: 2, name: "Female Product" }];
        mock.onGet("/product/get-female-products/").reply(200, products);

        const response = await getFemaleProductApi();
        expect(response.data).toEqual(products);
    });

    it("should create a product", async () => {
        const productData = { name: "New Product" };
        mock.onPost("/product/products/").reply(201, { id: 1, ...productData });

        const response = await createProductApi(productData);
        expect(response.status).toBe(201);
        expect(response.data.id).toBe(1);
    });

    it("should search for products", async () => {
        const query = "shirt";
        const results = [{ id: 1, name: "Shirt" }];
        mock.onGet(`/product/search/?query=${query}`).reply(200, results);

        const response = await searchProductsApi(query);
        expect(response.data).toEqual(results);
    });

    it("should add product to cart", async () => {
        const cartData = { productId: 1, quantity: 2 };
        mock.onPost("/product/carts/").reply(200, { success: true });

        const response = await addToCartApi(cartData);
        expect(response.data.success).toBe(true);
    });

    it("should get cart data", async () => {
        const cartItems = [{ id: 1, productId: 1, quantity: 2 }];
        mock.onGet("/product/carts/").reply(200, cartItems);

        const response = await getCartDataApi();
        expect(response.data).toEqual(cartItems);
    });

    it("should create a bill", async () => {
        const billData = { total: 100 };
        mock.onGet("/product/bills/").reply(200, { billId: 1, ...billData });

        const response = await createBillApi(billData);
        expect(response.data.billId).toBe(1);
    });

    it("should get user details", async () => {
        const userDetails = { id: 1, username: "testuser" };
        mock.onGet("/account/user-details/").reply(200, userDetails);

        const response = await userDetailsApi();
        expect(response.data).toEqual(userDetails);
    });
});
