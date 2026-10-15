import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-sanity-secret") || req.nextUrl.searchParams.get("secret");
    const configuredSecret = process.env.SANITY_REVALIDATE_SECRET;

    if (configuredSecret && secret !== configuredSecret) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const type = body?._type || body?.type;

    // Invalidate specific cache tags with recommended "max" profile for Next.js 16
    if (type) {
      revalidateTag(type, "max");
    }

    // Also revalidate relevant paths
    if (type === "post") {
      revalidatePath("/blog");
      if (body?.slug?.current) {
        revalidatePath(`/blog/${body.slug.current}`);
      }
    } else if (type === "album") {
      revalidatePath("/gallery");
      if (body?.slug?.current) {
        revalidatePath(`/gallery/${body.slug.current}`);
      }
    } else if (type === "faqItem") {
      revalidatePath("/faq");
    } else if (type === "aboutPage") {
      revalidatePath("/about");
    } else if (type === "homePage" || type === "siteSettings") {
      revalidatePath("/");
    }

    // Always revalidate root tag
    revalidateTag("siteSettings", "max");

    return NextResponse.json({
      status: 200,
      revalidated: true,
      type: type || "unknown",
      now: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
