package org.openmeetings.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.regex.Pattern;

import static org.openmeetings.utils.IOUtils.close;

/**
 * A wrapper for java.util.Properties class
 *
 * @threadsafety yes
 */
public final class PropertiesUtils {

    public static final Logger log = LoggerFactory.getLogger(PropertiesUtils.class);

    private PropertiesUtils() {
    }


    public static String getRequiredProperty(Properties p, String pp, String name) {
        String eName = getEffectiveName(p, pp, name);
        return getRequiredProperty(p, eName);
    }

    public static String getRequiredProperty(Properties p, String name) {
        String value = p.getProperty(name);
        if (value == null) {
            throw new RuntimeException("Property is not set '" + name + "'");
        }
        return value;
    }


    public static String getEffectiveName(Properties p, String prefix, String name) {
        String fullName = prefix + name;
        if (p.getProperty(fullName) != null) {
            return fullName;
        }
        if (p.getProperty(name) != null) {
            return name;
        }
        return fullName;
    }

    public static boolean getBoolean(Properties p, String pp, String name, boolean defaultValue) {
        String eName = getEffectiveName(p, pp, name);
        return getBoolean(p, eName, defaultValue);
    }

    public static boolean getBoolean(Properties p, String name, boolean defaultValue) {
        return p.getProperty(name, "" + defaultValue).equals("true");
    }

    public static int getRequiredInteger(Properties p, String name) {
        return Integer.parseInt(getRequiredProperty(p, name));
    }

    public static int getInteger(Properties p, String pp, String name, int defaultValue) {
        String eName = getEffectiveName(p, pp, name);
        return getInteger(p, eName, defaultValue);
    }

    public static int getInteger(Properties p, String name, int defaultValue) {
        return Integer.parseInt(p.getProperty(name, "" + defaultValue));
    }

    public static long getLong(Properties p, String pp, String name, long defaultValue) {
        String eName = getEffectiveName(p, pp, name);
        return getLong(p, eName, defaultValue);
    }

    public static long getLong(Properties p, String name, long defaultValue) {
        return Long.parseLong(p.getProperty(name, "" + defaultValue));
    }

    public static Locale getLocale(Properties p, String name, Locale defaultValue) {
        String country = p.getProperty(name, "NOT_EXIST_PROP");
        for (Locale locale : Locale.getAvailableLocales()) {
            if (locale.getCountry().equals(country)) {
                return locale;
            }
        }
        return defaultValue;
    }

    public static Properties load(File path) {
        Properties p;
        try {
            InputStream is = new FileInputStream(path);
            try {
                Properties tmp = new Properties();
                tmp.load(is);
                p = patchProperties(tmp);
            } finally {
                close(log, is);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error reading property file: " + path, e);
        }
        return p;
    }

    private static Properties patchProperties(Properties p) {
        Properties res = new Properties();
        for(Map.Entry<Object,Object> e: p.entrySet()) {
            int idx = -1;
            String val = e.getValue().toString();
            while((idx = val.indexOf("${", idx+1)) != -1) {
                int end = val.indexOf("}", idx+2);
                if(end != -1) {
                    String varName = val.substring(idx+2, end);
                    String jvmProp = System.getProperty(varName);
                    if(jvmProp == null) {
                        //log.warn("JVM property " + varName + " is not set");
                        continue;
                    }
                    val = val.replace(val.substring(idx, end + 1), jvmProp);
                }
            }
            res.put(e.getKey().toString(), val);
        }
        return res;
    }

    public static Properties load(Class<?> cls, String path) {
        Properties p;
        try {
            InputStream is = cls.getResourceAsStream(path);
            try {
                Properties tmp = new Properties();
                tmp.load(is);
                p = patchProperties(tmp);
            } finally {
                close(log, is);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error reading property file: " + path, e);
        }
        return p;
    }


    public static String loadTextResource(Class<?> cls, String path) {
        StringBuilder result = new StringBuilder();
        try {
            InputStream stream = cls.getResourceAsStream(path);
            if (stream == null) {
                throw new RuntimeException("Resource not found:" + path);
            }
            BufferedReader reader = new BufferedReader(new InputStreamReader(stream));
            try {

                do {
                    String line = reader.readLine();
                    if (line == null) {
                        break;
                    }
                    if (result.length() != 0) {
                        result.append('\n');
                    }
                    result.append(line);
                } while (true);
            } finally {
                close(log, reader);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error reading property file: " + path, e);
        }
        return result.toString();
    }


    public static void store(File file, Properties p) {
        File dir = file.getParentFile();
        if (!dir.exists()) {
            boolean ok = dir.mkdirs();
            if (!ok) {
                throw new RuntimeException("Failed to create directory: " + dir.getAbsolutePath());
            }
        }
        try {
            BufferedWriter w = new BufferedWriter(new FileWriter(file));
            try {
                p.store(w, null);
            } finally {
                close(log, w);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static Properties getAllWithPrefix(String prefix, Properties properties) {
        Properties result = new Properties();
        for (String name : properties.stringPropertyNames()) {
            if (name.startsWith(prefix)) {
                String value = properties.getProperty(name);
                result.setProperty(name, value);
            }
        }
        return result;

    }
}

