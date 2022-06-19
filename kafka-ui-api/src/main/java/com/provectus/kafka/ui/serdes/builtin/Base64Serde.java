package com.provectus.kafka.ui.serdes.builtin;

import com.provectus.kafka.ui.serdes.BuiltInSerde;
import com.provectus.kafka.ui.serde.api.DeserializeResult;
import com.provectus.kafka.ui.serde.api.PropertyResolver;
import com.provectus.kafka.ui.serde.api.SchemaDescription;
import org.apache.kafka.common.header.Headers;

import java.util.Base64;
import java.util.Map;
import java.util.Optional;

public class Base64Serde implements BuiltInSerde {

  public static String name() {
    return "Base64";
  }

  @Override
  public void configure(PropertyResolver serdeProperties,
                        PropertyResolver kafkaClusterProperties,
                        PropertyResolver globalProperties) {
  }

  @Override
  public Optional<String> description() {
    return Optional.empty();
  }

  @Override
  public Optional<SchemaDescription> getSchema(String topic, Type type) {
    return Optional.empty();
  }

  @Override
  public boolean canDeserialize(String topic, Type type) {
    return true;
  }

  @Override
  public boolean canSerialize(String topic, Type type) {
    return true;
  }

  @Override
  public Serializer serializer(String topic, Type type) {
    return new Serializer() {
      @Override
      public byte[] serialize(String topic, String input) {
        input = input.trim();
        // it is actually a hack to provide ability to sent empty array as a key/value
        if (input.length() == 0) {
          return new byte[]{};
        }
        return Base64.getDecoder().decode(input);
      }
    };
  }

  @Override
  public Deserializer deserializer(String topic, Type type) {
    var encoder = Base64.getEncoder();
    return new Deserializer() {
      @Override
      public DeserializeResult deserialize(String topic, Headers headers, byte[] data) {
        return new DeserializeResult(
            encoder.encodeToString(data),
            DeserializeResult.Type.STRING,
            Map.of()
        );
      }
    };
  }
}
