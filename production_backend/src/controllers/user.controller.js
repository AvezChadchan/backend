import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";
console.log("📩 Register endpoint hit");

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  //1-data getting
  const { fullname, username, email, password } = req.body;
  // console.log("Email: ", email);
  // console.log(req.body);

  //2- /validation/
  // if (fullname === "") {
  //   throw new apiError(400, "fullname is required");
  // }
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "All fields are required");
  }

  //3- user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new apiError(409, "User with email or username Already exists ");
  }

  //4- taking path of images
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // console.log(req.files);
  // console.log(avatarLocalPath);

  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  //or
  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new apiError(400, "Avatar Image is Reguired");
  }

  //5- uploading on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avatar) {
    throw new apiError(400, "Avatar is required!!");
  }

  //6- creating user obj and entering into db
  const userEntry = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase(),
    password,
  });

  //7- remove pass and referesh token from response
  //mongodb automatically creates _id for each row/entry
  //select method is used to select some fields which we don't want to show to the user in the response 
  const createdUser = await User.findById(userEntry._id).select(
    "-password -refreshToken"
  );

  //8- checking if user creatd or not
  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }

  // 9- sending response
  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User Registered Successfully"));
});

export { registerUser };
