import * as Yup from "yup";

export const curdSchema = Yup.object({
  productName: Yup.string().min(3).max(200).required("Product Name is required"),
  productDescription: Yup.string().min(5).max(255).required("Product Description is required"),
  productBrand: Yup.string().min(1).max(50).required("Product Brand is required"),
  productPrice: Yup.string().min(1).max(20).required("Product Price is required"),
  productColor: Yup.string().min(2).max(25).required("Product Color is required"),
  sizeS: Yup.string().min(1).max(20).required("Size S is required"),
  sizeM: Yup.string().min(1).max(20).required("Size M is required"),
  sizeL: Yup.string().min(1).max(20).required("Size L is required"),
  sizeXL: Yup.string().min(1).max(20).required("Size XL is required"),
  sizeXXL: Yup.string().min(1).max(20).required("Size XXL is required"),
  productType: Yup.string().required("Product Type is required"),
  productAudience:Yup.string().required("product audience is required..."),
  extraImg1:Yup.mixed()
  .required("Extra Image1 is required")
  .test("fileSize", "File size is too large", (value) => {
    return value && value.size <= 5 * 1024 * 1024; 
  })
  .test("fileType", "Unsupported file format", (value) => {
    return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
  }),
  extraImg2:Yup.mixed()
  .required("Extra Image2 is required")
  .test("fileSize", "File size is too large", (value) => {
    return value && value.size <= 5 * 1024 * 1024; 
  })
  .test("fileType", "Unsupported file format", (value) => {
    return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
  }),
  extraImg3:Yup.mixed()
  .required("Extra Image1 is required")
  .test("fileSize", "File size is too large", (value) => {
    return value && value.size <= 5 * 1024 * 1024; 
  })
  .test("fileType", "Unsupported file format", (value) => {
    return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
  }),
  mainImg:Yup.mixed()
  .required("Product Main Image is required")
  .test("fileSize", "File size is too large", (value) => {
    return value && value.size <= 5 * 1024 * 1024; 
  })
  .test("fileType", "Unsupported file format", (value) => {
    return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
  }),






});
