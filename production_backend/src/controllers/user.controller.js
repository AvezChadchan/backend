import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

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
  console.log("Email: ", email);
  res.status(200).json({
    message: "data received",
  });
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
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new apiError(409, "User with email or username Already exists ");
  }
  // console.log(existedUser);

  //4- images
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // console.log(req.files);
  // console.log(avatarLocalPath);
  const coverImageLocalPath = req.files?.coverImage[0]?.path;
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
    usernam: username.toLowerCase(),
    password,
  });

  //7- remove pass and referesh token from response
  //mongodb automatically creates _id for each row/entry
  //select method is used to select some fields which we don't want to show
  const createdUser = await User.findById(User._id).select(
    "-password -refreshToken"
  );

  //8- checking if user creatd or not
  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }

  // 9- sending response
  return res.status(201).json(
    new apiResponse(200,createdUser,"User Registered Successfully")
  )
});

export { registerUser };
