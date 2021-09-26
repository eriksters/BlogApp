import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BlogPostListItem from "./BlogPostListItem";
import { ActivityIndicator, Colors, IconButton } from "react-native-paper";

const BlogPostList = ({ BlogPosts, loadMore, refresh, endReached }) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onEndReached = async () => {
    if (!endReached && !refreshing && !loadingMore) {
      setLoadingMore(true);

      await loadMore();

      setLoadingMore(false);
    }
  };

  const onRefresh = async () => {
    if (!loadingMore && !refreshing) {
      setRefreshing(true);

      await refresh();

      setRefreshing(false);
    }
  };

  const ListEmptyComponent = () => (
    <View style={styles.emptyListContainer}>
      {endReached ? (
        <>
          <Text style={styles.emptyListText}>Nothing to show here</Text>
          <Text style={styles.emptyListText}>Pull down to reload</Text>
        </>
      ) : null}
    </View>
  );

  const ListFooterComponent = () => (
    <View style={styles.footer}>
      {endReached ? (
        <Text>Nothing more to load</Text>
      ) : (
        <ActivityIndicator
          style={styles.loadingMoreIndicator}
          size={24}
          animating={loadingMore}
          color={Colors.deepPurple500}
        />
      )}
    </View>
  );

  const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={refreshing}
        onRefresh={() => refresh()}
        contentContainerStyle={styles.list}
        data={BlogPosts}
        renderItem={({ item }) => {
          return (
            <BlogPostListItem BlogPost={item} onDeleteCallback={refresh} />
          );
        }}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        onEndReached={onEndReached}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  list: {
    paddingTop: 50,
  },
  itemWrapper: {
    marginBottom: 15,
  },
  itemSeparator: {
    height: 16,
  },
  emptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  footer: {
    marginVertical: 20,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingMoreIndicator: {
    marginVertical: 0,
    paddingVertical: 0,
  },
  emptyListText: {},
});
export default BlogPostList;
