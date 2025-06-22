import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Zap, Sparkles } from "lucide-react";

export default function SpecialFeaturesCard({ character }) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="card-header-background-features">
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          תכונות מיוחדות
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-48">
          <div className="space-y-3">
            {character.features?.length > 0 ? (
              character.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-3 bg-white rounded-lg border border-amber-200 shadow-sm"
                  whileHover={{ scale: 1.01 }}
                >
                  <h4 className="font-bold text-amber-800 mb-1">{feature.name}</h4>
                  <p className="text-sm text-amber-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-amber-600">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-amber-400" />
                <p>אין תכונות מיוחדות</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 