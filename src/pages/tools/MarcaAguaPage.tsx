import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import ToolPageLayout from "@/components/tools/ToolPageLayout";
import FileDropZone from "@/components/tools/FileDropZone";
import { Button } from "@/components/ui/button";
import { isPdfFile, watermarkImage, watermarkPdf } from "@/lib/tools/watermark";

const MarcaAguaPage = () => {
  const { t } = useTranslation("tools");

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [opacity, setOpacity] = useState(30);
  const [fontSize, setFontSize] = useState(36);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (selected: File) => {
    setFile(selected);
    setResultUrl(null);
    setError(null);
  };

  const reset = () => {
    setFile(null);
    setResultUrl(null);
    setError(null);
  };

  const handleApply = async () => {
    if (!file || !text.trim()) return;
    setProcessing(true);
    setError(null);
    try {
      const options = { text: text.trim(), opacity: opacity / 100, fontSize };
      const blob = isPdfFile(file) ? await watermarkPdf(file, options) : await watermarkImage(file, options);
      setResultUrl(URL.createObjectURL(blob));
    } catch {
      setError(t("ui.error_generic"));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout toolId="marca-agua">
      <div className="border border-neutral-800 rounded-xl p-6 md:p-8">
        {!file ? (
          <FileDropZone
            accept="application/pdf,.pdf,image/jpeg,image/png,image/webp"
            label={t("ui.upload_label_watermark")}
            hint={t("ui.upload_hint_watermark")}
            onFile={handleFile}
            toolId="marca-agua"
          />
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-400 truncate max-w-[60%]">{file.name}</span>
              <Button
                variant="outline"
                onClick={reset}
                className="rounded-full px-6 border-neutral-700 text-white bg-transparent hover:bg-white/10"
              >
                {t("ui.reset_button_file")}
              </Button>
            </div>

            <div>
              <p className="text-neutral-400 text-sm mb-2">{t("ui.watermark_text_label")}</p>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t("ui.watermark_text_placeholder")}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-600"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-neutral-400 text-sm mb-2">{t("ui.watermark_opacity_label")}</p>
                <input
                  type="range"
                  min={10}
                  max={80}
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-neutral-500 text-xs mt-1">{opacity}%</p>
              </div>
              <div>
                <p className="text-neutral-400 text-sm mb-2">{t("ui.watermark_size_label")}</p>
                <input
                  type="range"
                  min={16}
                  max={72}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
                <p className="text-neutral-500 text-xs mt-1">{fontSize}px</p>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex flex-wrap gap-3">
              {!resultUrl ? (
                <Button
                  onClick={handleApply}
                  disabled={!text.trim()}
                  isLoading={processing}
                  loadingText={t("ui.processing")}
                  className="bg-white text-black hover:bg-white/80 rounded-full px-8"
                >
                  {t("ui.watermark_apply_button")}
                </Button>
              ) : (
                <a
                  href={resultUrl}
                  download={`${file.name.replace(/\.[^.]+$/, "")}-marca-agua${isPdfFile(file) ? ".pdf" : `.${file.name.split(".").pop()}`}`}
                >
                  <Button className="bg-white text-black hover:bg-white/80 rounded-full px-8">
                    <Download className="w-4 h-4" />
                    {t("ui.download_button")}
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default MarcaAguaPage;
