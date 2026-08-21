import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Badge } from "@/components/mazzgord-ui";
import { useColors } from "@/hooks/use-colors";

export function HeroCard({ scrollY }: { scrollY?: Animated.Value }) {
  const colors = useColors();

  const b1 = useRef(new Animated.Value(0)).current;
  const b2 = useRef(new Animated.Value(0)).current;
  const b3 = useRef(new Animated.Value(0)).current;
  const b4 = useRef(new Animated.Value(0)).current;
  const shine = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;
  const btnGlow = useRef(new Animated.Value(0)).current;
  const btnShine = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = (val: Animated.Value, duration: number, delay = 0) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(val, { toValue: 1, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(val, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      );

    const a1 = loop(b1, 3000);
    const a2 = loop(b2, 4000, 400);
    const a3 = loop(b3, 3500, 800);
    const a4 = loop(b4, 5000, 200);
    const aglow = loop(glow, 2500, 300);
    const aglowBtn = loop(btnGlow, 1800);
    const ashine = Animated.loop(
      Animated.sequence([
        Animated.delay(2000),
        Animated.timing(shine, { toValue: 1, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(shine, { toValue: 0, duration: 2500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );

    const abtnShine = Animated.loop(
      Animated.sequence([
        Animated.delay(1500),
        Animated.timing(btnShine, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(btnShine, { toValue: 0, duration: 600, useNativeDriver: true }),
        Animated.delay(2000),
      ])
    );
    a1.start(); a2.start(); a3.start(); a4.start(); aglow.start(); aglowBtn.start(); ashine.start(); abtnShine.start();
    return () => { a1.stop(); a2.stop(); a3.stop(); a4.stop(); aglow.stop(); aglowBtn.stop(); ashine.stop(); abtnShine.stop(); };
  }, []);

  const b1Y = b1.interpolate({ inputRange: [0, 1], outputRange: [0, -28] });
  const b1X = b1.interpolate({ inputRange: [0, 1], outputRange: [0, 14] });
  const b1Scale = b1.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] });
  const b2Y = b2.interpolate({ inputRange: [0, 1], outputRange: [0, 20] });
  const b2Scale = b2.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] });
  const b3Y = b3.interpolate({ inputRange: [0, 1], outputRange: [0, -16] });
  const b3X = b3.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });
  const b3Scale = b3.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });
  const b4Y = b4.interpolate({ inputRange: [0, 1], outputRange: [0, 22] });
  const b4Scale = b4.interpolate({ inputRange: [0, 1], outputRange: [1, 1.28] });
  const shineX = shine.interpolate({ inputRange: [0, 1], outputRange: [-280, 280] });
  const shineOpacity = shine.interpolate({ inputRange: [0, 0.3, 0.7, 1], outputRange: [0, 0.15, 0.15, 0] });
  const glowScale = glow.interpolate({ inputRange: [0, 1], outputRange: [1, 1.15] });
  const glowOpacity = glow.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.6] });
  const btnGlowScale = btnGlow.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] });
  const btnGlowOpacity = btnGlow.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });
  const btnGlowRadius = btnGlow.interpolate({ inputRange: [0, 1], outputRange: [14, 26] });
  const btnShineX = btnShine.interpolate({ inputRange: [0, 1], outputRange: [-160, 160] });
  const btnShineOpacity = btnShine.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 0.5, 0.5, 0] });

  // Parallax
  const sy = scrollY ?? new Animated.Value(0);
  const pBack = sy.interpolate({ inputRange: [-100, 300], outputRange: [20, -40], extrapolate: "clamp" });
  const pMid1 = sy.interpolate({ inputRange: [-100, 300], outputRange: [30, -60], extrapolate: "clamp" });
  const pMid2 = sy.interpolate({ inputRange: [-100, 300], outputRange: [25, -50], extrapolate: "clamp" });
  const pFront = sy.interpolate({ inputRange: [-100, 300], outputRange: [35, -70], extrapolate: "clamp" });
  const pContent = sy.interpolate({ inputRange: [-100, 300], outputRange: [0, -15], extrapolate: "clamp" });
  const pOpacity = sy.interpolate({ inputRange: [0, 250], outputRange: [1, 0.85], extrapolate: "clamp" });

  const onPressIn = () => {
    Animated.spring(btnScale, { toValue: 0.92, useNativeDriver: true, speed: 50 }).start();
  };
  const onPressOut = () => {
    Animated.spring(btnScale, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  return (
    <View style={{ marginBottom: 22, paddingTop: 8 }}>
      {/* Dis golge */}
      <View style={{ position: "absolute", top: 12, left: 4, right: 4, bottom: -6, borderRadius: 30, backgroundColor: "rgba(0,0,0,0.12)", shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 15 }} />

      <View style={{ borderRadius: 25, overflow: "hidden", elevation: 12, shadowColor: "#000", shadowOpacity: 0.35, shadowRadius: 16, shadowOffset: { width: 0, height: 8 } }}>
        {/* Gradient arka plan */}
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#F97316" }} />
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#C2410C", opacity: 0.55 }} />
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60%", backgroundColor: "#FB923C", opacity: 0.3 }} />

        {/* En arka balon */}
        <Animated.View style={{ position: "absolute", width: 220, height: 220, borderRadius: 110, backgroundColor: "rgba(255,255,255,0.1)", left: -80, top: -40, transform: [{ translateY: Animated.add(b4Y, pBack) }, { scale: b4Scale }], zIndex: 0 }} />

        {/* Glow halka */}
        <Animated.View style={{ position: "absolute", width: 160, height: 160, borderRadius: 80, borderWidth: 2, borderColor: "rgba(255,255,255,0.25)", right: -40, top: -30, transform: [{ scale: glowScale }], opacity: glowOpacity, zIndex: 1 }} />

        {/* Turuncu balon */}
        <Animated.View style={{ position: "absolute", width: 130, height: 130, borderRadius: 65, backgroundColor: "rgba(254,215,170,0.5)", right: -25, top: -45, transform: [{ translateY: Animated.add(b1Y, pMid1) }, { translateX: b1X }, { scale: b1Scale }], shadowColor: "rgba(251,146,60,0.6)", shadowOpacity: 1, shadowRadius: 30, shadowOffset: { width: 0, height: 4 }, elevation: 8, zIndex: 2 }} />

        {/* Camgobegi balon */}
        <Animated.View style={{ position: "absolute", width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(20,184,166,0.42)", left: -22, bottom: -12, transform: [{ translateY: Animated.add(b2Y, pMid2) }, { scale: b2Scale }], shadowColor: "rgba(20,184,166,0.5)", shadowOpacity: 0.8, shadowRadius: 22, shadowOffset: { width: 0, height: 3 }, elevation: 6, zIndex: 2 }} />

        {/* Altin balon */}
        <Animated.View style={{ position: "absolute", width: 70, height: 70, borderRadius: 35, backgroundColor: "rgba(253,224,71,0.38)", right: 30, bottom: -8, transform: [{ translateY: Animated.add(b3Y, pFront) }, { translateX: b3X }, { scale: b3Scale }], shadowColor: "rgba(253,224,71,0.4)", shadowOpacity: 0.7, shadowRadius: 16, shadowOffset: { width: 0, height: 2 }, elevation: 4, zIndex: 3 }} />

        {/* Parlama */}
        <Animated.View style={{ position: "absolute", width: 120, height: 400, backgroundColor: "rgba(255,255,255,0.1)", transform: [{ translateX: shineX }, { rotate: "20deg" }], opacity: shineOpacity, zIndex: 4 }} />

        {/* Glassmorphism */}
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, backgroundColor: "rgba(255,255,255,0.08)", borderBottomLeftRadius: 50, borderBottomRightRadius: 50, zIndex: 5 }} />

        {/* Icerik */}
        <Animated.View style={{ padding: 22, paddingBottom: 20, zIndex: 10, transform: [{ translateY: pContent }], opacity: pOpacity }}>
          <Badge tone="orange">GÜVENİLİR ÇEVİRİ DENEYİMİ</Badge>
          <Text style={{ color: "#fff", fontSize: 29, fontWeight: "900", lineHeight: 34, letterSpacing: -0.8, marginTop: 17, maxWidth: 280, textShadowColor: "rgba(0,0,0,0.35)", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 5 }}>Belgeleriniz, doğru dilde geleceğe hazır.</Text>
          <Text style={{ color: "rgba(255,255,255,0.92)", fontSize: 14, lineHeight: 21, marginTop: 10, maxWidth: 290, textShadowColor: "rgba(0,0,0,0.3)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>Profesyonel, yeminli ve hızlı çeviri hizmeti. Teklifinizi birkaç adımda alın.</Text>

          {/* Glass buton - glow'lu */}
          <Animated.View style={{ marginTop: 20, width: "72%", transform: [{ scale: btnScale }], shadowColor: "rgba(20,184,166,0.6)", shadowOpacity: btnGlowOpacity, shadowRadius: btnGlowRadius, shadowOffset: { width: 0, height: 4 }, elevation: 8, borderRadius: 16 }}>
            <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={() => router.push("/quote")} style={({ pressed }) => ({ minHeight: 52, borderRadius: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingHorizontal: 18, backgroundColor: pressed ? "rgba(15,118,110,0.8)" : "rgba(20,184,166,0.65)", borderWidth: 1, borderColor: "rgba(255,255,255,0.3)", overflow: "hidden" })}>
              {/* Kose isildamasi - sol ust koseden yayilan isik */}
              <Animated.View style={{ position: "absolute", width: 60, height: 60, borderRadius: 30, backgroundColor: "rgba(255,255,255,0.4)", left: -20, top: -20, opacity: btnShineOpacity, transform: [{ scale: btnShine.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.5] }) }] }} />
              {/* Kayan isik - soldan saga gecen parlama */}
              <Animated.View style={{ position: "absolute", width: 60, height: 80, backgroundColor: "rgba(255,255,255,0.35)", transform: [{ translateX: btnShineX }, { rotate: "20deg" }], opacity: btnShineOpacity }} />
              <MaterialIcons name="arrow-forward" size={19} color="#fff" />
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "800", textShadowColor: "rgba(0,0,0,0.25)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 }}>Hemen teklif al</Text>
            </Pressable>
          </Animated.View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 15 }}>
            <MaterialIcons name="schedule" size={15} color="rgba(255,255,255,0.8)" />
            <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: "600", textShadowColor: "rgba(0,0,0,0.25)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 }}>24 saat içinde teklif dönüşü</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
