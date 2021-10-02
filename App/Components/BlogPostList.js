import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BlogPostListItem from "./BlogPostListItem";
import { ActivityIndicator, Colors, IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";

const BlogPostList = ({ loadMore, refresh }) => {
  const postsState = useSelector((state) => state.blogPosts);

  const flatListRef = useRef();

  const onEndReached = async () => {
    loadMore();
  };

  const onRefresh = async () => {
    refresh();
  };

  useEffect(() => {
    if (postsState.refreshing) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [postsState.refreshing]);

  const ListEmptyComponent = () => (
    <View style={styles.emptyListContainer}>
      {postsState.endReached ? (
        <>
          <Text style={styles.emptyListText}>Nothing to show here</Text>
          <Text style={styles.emptyListText}>Pull down to reload</Text>
        </>
      ) : null}
    </View>
  );

  const ListFooterComponent = () => (
    <View style={styles.footer}>
      {postsState.endReached ? (
        <Text>Nothing more to load</Text>
      ) : (
        <ActivityIndicator
          style={styles.loadingMoreIndicator}
          size={24}
          animating={postsState.loadingMore}
          color={Colors.deepPurple500}
        />
      )}
    </View>
  );

  const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={postsState.refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={styles.list}
        data={postsState.data}
        extraData={postsState.data}
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
        ref={flatListRef}
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
