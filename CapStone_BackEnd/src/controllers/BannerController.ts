import Banner from "../models/Banner";

export class BannerController {
  static async addBanner(req: any, res: any) {
    const path = req.file.path;
    try {
      const data = { banner: path };
      const banner = await new Banner(data).save();
      res.send(banner);
    } catch (err) {
      res.send(err);
    }
  }

  static async getBanners(req: any, res: any, next: any) {
    try {
      const banners = await Banner.find({});
      res.send(banners);
    } catch (err) {
      next(err);
    }
  }
}
