const sharp = require("sharp");
const { encode } = require("blurhash");

function randomName() {
  switch (Math.floor(Math.random() * 7)) {
    case 0:
      return "Charles Cahill";
    case 1:
      return "Rudy Haley";
    case 2:
      return "Felicity Howell";
    case 3:
      return "Frank Kohler";
    case 4:
      return "Milo Koss";
    case 5:
      return "Kris Klocko";
    case 6:
      return "Andy Effertz";
  }
}

function randomColor() {
  switch (Math.floor(Math.random() * 7)) {
    case 0:
      //purple
      return "rgba(194, 0, 255, .95)";
    case 1:
      //blue
      return "rgba(0, 198, 255, .95)";
    case 2:
      //yellow
      return "rgba(255, 239, 0, .95)";
    case 3:
      //pink
      return "rgba(255, 0, 182, .95)";
    case 4:
      //teal
      return "rgba(0, 255, 169, .95)";
    case 5:
      //red
      return "rgba(255, 0, 57, .95)";
    case 6:
      //orange
      return "rgba(255, 143, 0, .95)";
  }
}

const encodeImageToBlurhash = async (path) =>
  new Promise((resolve, reject) => {
    sharp(path)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer((err, buffer, info) => {
        if (err) return reject(err);
        console.log(path);
        resolve(
          encode(new Uint8ClampedArray(buffer), info.width, info.height, 5, 5)
        );
      });
  });

async function getImg(path) {
  const Newpath = "./images/100-100-color/" + path + ".jpg";
  return {
    uri: "http://192.168.1.72:8080/images/" + path,
    blur: await encodeImageToBlurhash(Newpath).then((hash) => {
      console.log(hash);
      return hash;
    }),
  };
}

module.exports = async function () {
  const Data = [];

  for (let i = 0; i < 9; i++) {
    var img1;
    var img2;
    var img3;

    await getImg(Math.floor(Math.random() * 50) + 1).then((res1) => {
      img1 = res1;
      getImg(Math.floor(Math.random() * 50) + 1).then((res2) => {
        img2 = res2;
        getImg(Math.floor(Math.random() * 50) + 1).then((res3) => {
          img3 = res3;
          Data.push({
            name: randomName(),
            username: randomName(),
            pfp:
              "http://192.168.1.72:8080/images/" +
              Math.floor(Math.random() * 50) +
              1,
            large: Math.random() < 0.5,
            color: randomColor(),
            posts: [
              {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                color: randomColor(),
                name: randomName(),
                imgs: [img1],
              },
              {
                color: randomColor(),
                name: randomName(),
                imgs: [img2],
              },
              {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                color: randomColor(),
                name: randomName(),
                imgs: [img3],
              },
            ],
          });
        });
      });
    });
  }
  return Data;
};
